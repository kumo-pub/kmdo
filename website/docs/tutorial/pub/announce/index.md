# Announce

Kmdo can also announce new releases on social networks, chat rooms and via
email!

It runs at the very end of the pipeline and can be skipped with the
`--skip=announce` flag of the [`release`](/docs/cmd/pub/pub_release.mdx)
command, or via the skip property:

```yaml title=".kmdopkg.yaml"
announce:
  # Skip the announcing feature in some conditions, for instance, when
  # publishing patch releases.
  #
  # Any value different from 'true' is evaluated to false.
  #
  # Templates: allowed.
  skip: "{{gt .Patch 0}}"
```

## Supported announcers:

<div class="grid cards" markdown>

- :simple-bluesky: [Bluesky](bluesky.mdx)
- :simple-discord: [Discord](./discord.mdx)
- :material-linkedin: [LinkedIn](./linkedin.mdx)
- :simple-mastodon: [Mastodon](./mastodon.mdx)
- :simple-mattermost: [Mattermost](./mattermost.mdx)
- :simple-opencollective: [OpenCollective](./opencollective.mdx)
- :simple-reddit: [Reddit](./reddit.mdx)
- :simple-slack: [Slack](./slack.mdx)
- :material-email: [Email/SMTP](./smtp.mdx)
- :material-microsoft-teams: [Teams](./teams.mdx)
- :simple-telegram: [Telegram](./telegram.mdx)
- :fontawesome-brands-x-twitter: [𝕏/Twitter](./twitter.mdx)
- :material-webhook: [Webhooks](./webhook.mdx)

</div>
