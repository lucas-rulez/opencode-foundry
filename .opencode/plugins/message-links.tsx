/** @jsxImportSource @opentui/solid */
import type { TuiPluginModule } from "@opencode-ai/plugin/tui"

const MessageLinks: TuiPluginModule = {
  id: "message-links-demo",
  tui: async (api) => {
    api.slots.register({
      slots: {
        message_metadata(ctx, props) {
          const base = `https://github.com/lucas-rulez/opencode-message-actions`
          const query = `?sessionID=${encodeURIComponent(props.session_id)}&messageID=${encodeURIComponent(props.message_id)}`

          return (
            <box flexDirection="row" marginTop={1}>
              <text fg={ctx.theme.current.textMuted}> · </text>
              <ctx.Link href={`${base}/issues/new${query}`} fg={ctx.theme.current.markdownLinkText}>
                Link 1
              </ctx.Link>
              <text fg={ctx.theme.current.textMuted}> · </text>
              <ctx.Link href={`${base}${query}`} fg={ctx.theme.current.markdownLinkText}>
                Link 2
              </ctx.Link>
            </box>
          )
        },
      },
    })
  },
}

export default MessageLinks
