#!/bin/bash
set -euo pipefail

# ==================== Core Configuration ====================
PROJECT="kmdo"
DOWNLOAD_BASE_URL="https://github.com/kumose/kmdo/releases/download"
DEFAULT_VERSION="v1.0.0"
KMDO_HOME="$HOME/.kmdo"
BIN_DIR="$KMDO_HOME/bin"
ENV_FILE="$KMDO_HOME/kmdo.env"
PROFILE_FILE=""
PROFILE_CONTENT="# kmdo environment variable configuration (auto-generated, do not modify manually)
export KMDO_HOME=\"$KMDO_HOME\"
# Source env file only if it exists (avoid startup errors)
[ -f \"\$KMDO_HOME/kmdo.env\" ] && source \"\$KMDO_HOME/kmdo.env\"
"
# ============================================================

# Color output functions
info() { echo -e "\033[34m[INFO]\033[0m $*"; }
success() { echo -e "\033[32m[SUCCESS]\033[0m $*"; }
error() { echo -e "\033[31m[ERROR]\033[0m $*" >&2; exit 1; }

# Detect system architecture (amd64/arm64)
detect_arch() {
  case "$(uname -m)" in
    x86_64 | amd64) echo "amd64" ;;
    arm64 | aarch64) echo "arm64" ;;
    *) error "Unsupported architecture: $(uname -m), only amd64/arm64 are supported" ;;
  esac
}

# Detect operating system (Linux/macOS)
detect_os() {
  case "$(uname -s)" in
    Linux) echo "linux" ;;
    Darwin) echo "darwin" ;;
    *) error "Unsupported OS: $(uname -s), only Linux/macOS are supported" ;;
  esac
}

# Detect user's profile file (prioritize zsh, then bash)
detect_profile() {
  if [ -f "$HOME/.zshrc" ]; then
    PROFILE_FILE="$HOME/.zshrc"
  elif [ -f "$HOME/.bashrc" ]; then
    PROFILE_FILE="$HOME/.bashrc"
  elif [ -f "$HOME/.bash_profile" ]; then
    PROFILE_FILE="$HOME/.bash_profile"
  else
    error "No available profile file (.zshrc/.bashrc) found, please configure environment variables manually"
  fi
}

# Parse command line arguments (support remote version / local package)
parse_args() {
  VERSION="$DEFAULT_VERSION"
  LOCAL_PACKAGE=""

  # Parse arguments: --local <package-path> or [version]
  while [ $# -gt 0 ]; do
    case "$1" in
      --local)
        if [ $# -lt 2 ]; then
          error "Usage of --local: --local <path-to-local-tar.gz>"
        fi
        LOCAL_PACKAGE="$2"
        shift 2
        ;;
      *)
        # If not --local, treat as version
        VERSION="$1"
        shift 1
        ;;
    esac
  done

  # Validate local package (if specified)
  if [ -n "$LOCAL_PACKAGE" ] && [ ! -f "$LOCAL_PACKAGE" ]; then
    error "Local package not found: $LOCAL_PACKAGE"
  fi
}

# Extract binary from local tar package
extract_local_package() {
  info "Extracting local package: $LOCAL_PACKAGE"
  # Create temp dir for extraction
  TEMP_DIR=$(mktemp -d -t kmdo-local-XXXXXX)
  trap 'rm -rf "$TEMP_DIR"' EXIT  # Cleanup temp dir on exit

  # Extract tar package (only the binary file)
  tar -xzf "$LOCAL_PACKAGE" -C "$TEMP_DIR" || error "Failed to extract local package"

  # Find the binary (match project name, ignore path in tar)
  BINARY_PATH=$(find "$TEMP_DIR" -name "$PROJECT" -type f | head -n 1)
  if [ -z "$BINARY_PATH" ]; then
    error "No valid $PROJECT binary found in local package"
  fi

  # Copy binary to bin dir
  cp "$BINARY_PATH" "$BIN_DIR/$PROJECT" || error "Failed to copy binary from local package"
  chmod +x "$BIN_DIR/$PROJECT"
  info "Successfully extracted binary from local package"
}

# Download binary from remote (original logic)
download_remote_binary() {
  ARCH=$(detect_arch)
  OS=$(detect_os)
  BINARY_NAME="${PROJECT}-${OS}-${ARCH}"
  DOWNLOAD_URL="${DOWNLOAD_BASE_URL}/${VERSION}/${BINARY_NAME}.tar.gz"  # Match release package name

  info "Downloading remote package: $DOWNLOAD_URL"
  # Download tar package
  if command -v wget >/dev/null 2>&1; then
    wget -q -O "$BINARY_NAME.tar.gz" "$DOWNLOAD_URL" || error "Remote download failed, check version and network"
  elif command -v curl >/dev/null 2>&1; then
    curl -sSL -o "$BINARY_NAME.tar.gz" "$DOWNLOAD_URL" || error "Remote download failed, check version and network"
  else
    error "wget or curl not found, please install first"
  fi

  # Extract binary from remote tar package
  tar -xzf "$BINARY_NAME.tar.gz" -C "$BIN_DIR" || error "Failed to extract remote package"
  rm -f "$BINARY_NAME.tar.gz"  # Cleanup downloaded tar
  chmod +x "$BIN_DIR/$PROJECT"
}

# Check if kmdo config already exists in profile (avoid duplicate entries)
is_profile_config_exist() {
  # Check if the auto-generated comment exists (identify our config block)
  grep -qxF "# kmdo environment variable configuration (auto-generated, do not modify manually)" "$PROFILE_FILE"
}
# Core installation logic
main() {
  parse_args "$@"
  detect_profile

  # Create necessary directories
  mkdir -p "$BIN_DIR" "$KMDO_HOME/config" || error "Failed to create $KMDO_HOME, check $HOME permissions"

  # Install binary: local package first, then remote
  if [ -n "$LOCAL_PACKAGE" ]; then
    extract_local_package
  else
    download_remote_binary
  fi

  # Initialize environment via program's own command
  info "Initializing kmdo environment via: $BIN_DIR/$PROJECT env integrate"
  if ! "$BIN_DIR/$PROJECT" env integrate; then
    error "Environment initialization failed! Please run '$BIN_DIR/$PROJECT env integrate' manually to debug."
  fi


  # Manage profile configuration (avoid duplicates)
  if is_profile_config_exist; then
    info "kmdo environment configuration already exists in $PROFILE_FILE, skipping addition"
  else
    info "Adding kmdo environment configuration to $PROFILE_FILE"
    # Append config block (with blank line for readability)
    echo -e "\n$PROFILE_CONTENT" >> "$PROFILE_FILE"
  fi

  # Verify installation
  if command -v "$PROJECT" >/dev/null 2>&1; then
    success "${PROJECT} installed successfully! Version: $(${PROJECT} --version)"
  else
    success "${PROJECT} installed successfully! Run 'source $PROFILE_FILE' to activate"
  fi
  success "Uninstallation: rm -rf $KMDO_HOME + remove reference line in $PROFILE_FILE"
  echo -e "\033[33m[REMINDER]\033[0m To make the command available immediately:"
  echo -e "  1. Run: source $PROFILE_FILE  # Activate in current shell"
  echo -e "  2. Or: Restart your terminal/shell  # Permanent activation"
}

main "$@"