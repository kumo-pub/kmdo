# Quick Start

In this example we will build, archive and release a sample project.

Create a GitHub repository, clone and `cd` into it, and let's get started!

=== ":simple-go: Go"

    Initialize your module with:

    ```sh
    go mod init github.com/you/your-repo
    ```

    Then create a `main.go` file:

    ```go title="main.go"
    package main

    func main() {
      println("Ba dum, tss!")
    }
    ```

=== ":simple-rust: Rust"

    Initialize your project with:

    ```sh
    cargo init --bin
    ```

=== ":simple-zig: Zig"

    Initialize your project with:

    ```sh
    zig init
    ```

=== ":simple-bun: Bun"

    Initialize your project with:

    ```sh
    bun init
    ```

=== ":simple-deno: Deno"

    Initialize your project with:

    ```sh
    deno init
    ```

Run the [init](/docs/cmd/pub/pub_init.mdx) command to create an example `.kmdopkg.yaml` file:

```sh
kmdo pub init
```

Now, lets run a "local-only" release to see if it works using the [release](/docs/cmd/pub/pub_release.mdx) command:

```sh
kmdo pub release --snapshot --clean
```

At this point, you can [customize](overview.mdx) the generated `.kmdopkg.yaml` or leave it as-is, it's up to you.
It is best practice to check `.kmdopkg.yaml` into the source control.

You can verify your `.kmdopkg.yaml` is valid by running the [check](/docs/cmd/pub/pub_check.mdx) command:

```sh
kmdo pub check
```

You can also use Kmdo to [build](/docs/cmd/pub/pub_build.mdx) the binary only for a given target, which is useful for local development:

=== ":simple-go: Go"

    ```sh
    GOOS="linux" \
    GOARCH="arm64" \
      kmdo pub build --single-target
    ```

    It will default to your current `GOOS`/`GOARCH`.

=== ":simple-rust: Rust"

    ```sh
    TARGET="aarch64-unknown-linux-gnu" \
      kmdo pub build --single-target
    ```

=== ":simple-zig: Zig"

    ```sh
    TARGET="aarch64-linux" \
      kmdo pub build --single-target
    ```

=== ":simple-bun: Bun"

    ```sh
    TARGET="bun-linux-arm64" \
      kmdo pub build --single-target
    ```

=== ":simple-deno: Deno"

    ```sh
    TARGET="aarch64-unknown-linux-gnu" \
      kmdo pub build --single-target
    ```

To release to GitHub, you'll need to export a `GITHUB_TOKEN` environment variable, which should contain a valid GitHub token with the `repo` scope.
It will be used to deploy releases to your GitHub repository.
You can create a new GitHub token [here](https://github.com/settings/tokens/new?scopes=repo,write:packages).

:::info

    The minimum permissions the `GITHUB_TOKEN` should have to run this are `write:packages`
:::

```sh
export GITHUB_TOKEN="YOUR_GH_TOKEN"
```

Kmdo will use the latest [Git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) of your repository.

Now, create a tag and push it to GitHub:

```sh
git tag -a v0.1.0 -m "First release"
git push origin v0.1.0
```

:::info

    Check if your tag adheres to [semantic versioning](/docs/cookbook/semver.mdx).
:::
:::info

    If you don't want to create a tag yet, you can also run Kmdo without
    publishing based on the latest commit by using the `--snapshot` flag:
:::
    ```sh
    kmdo pub release --snapshot
    ```

Now you can run Kmdo at the root of your repository:

```sh
kmdo pub release
```

That's all it takes!

Kmdo will build the binaries for your app for the default targets for the
build mechanism being used.
You can customize that by changing the `builds` section.
Check the [documentation](/docs/tutorial/pub/builds/index.mdx) for more information.

After building the binaries, Kmdo will create an archive for each target into a separate file.
You can customize several things by changing the `archives` section, including releasing only the binaries and not creating archives at all.
Check the [documentation](/docs/tutorial/pub/archive/archive.mdx) for more information.

Finally, it will create a release on GitHub with all the artifacts.

Check your GitHub project's releases page!

## Dry run

If you want to test everything before doing a release "for real", you can
use the following techniques.

### Verify dependencies

You can check if you have every tool needed for the current configuration:

```sh
kmdo pub healthcheck
```

### Build-only Mode

Build command will build the project:

```sh
kmdo pub build
```

This can be useful as part of CI pipelines to verify the project builds
without errors for all build targets.

### Release Flags

Use the `--skip=publish` flag to skip publishing:

```sh
kmdo pub release --skip=publish
```

### More options

You can check the command line usage help [here](/docs/cmd/pub/pub.mdx) or with:

```sh
kmdo pub --help
```
