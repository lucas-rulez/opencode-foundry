/** @jsxImportSource @opentui/solid */
import { expect, test } from "bun:test"
import { createSlot, createSolidSlotRegistry, testRender, useRenderer } from "@opentui/solid"
import { onMount } from "solid-js"
import type { TuiSlotContext, TuiSlotMap } from "@opencode-ai/plugin/tui"

type Slots = {
  prompt: {}
}

test("replace slot mounts plugin content once", async () => {
  let mounts = 0

  const Probe = () => {
    onMount(() => {
      mounts += 1
    })
    return <box />
  }

  const App = () => {
    const registry = createSolidSlotRegistry<Slots>(useRenderer(), {})
    const Slot = createSlot(registry)
    registry.register({ id: "plugin", slots: { prompt: () => <Probe /> } })

    return (
      <Slot name="prompt" mode="replace">
        <box />
      </Slot>
    )
  }

  const app = await testRender(() => <App />)
  try {
    expect(mounts).toBe(1)
  } finally {
    app.renderer.destroy()
  }
})

test("message metadata slot provides message identity and clickable links", async () => {
  const links: string[] = []
  const actions: Array<() => void> = []
  let clicked = false

  const App = () => {
    const registry = createSolidSlotRegistry<
      TuiSlotMap<{ message_metadata: { session_id: string; message_id: string } }>,
      TuiSlotContext
    >(useRenderer(), {
      theme: {} as TuiSlotContext["theme"],
      Link: (props) => {
        links.push(props.href)
        return <text>{props.children}</text>
      },
      Action: (props) => {
        actions.push(props.onClick)
        return <text onMouseUp={props.onClick}>{props.children}</text>
      },
    })
    const Slot = createSlot(registry)

    registry.register({
      id: "plugin",
      slots: {
        message_metadata(ctx, props) {
          return (
            <box>
              <ctx.Link href={`https://example.test/${props.session_id}/${props.message_id}`}>open</ctx.Link>
              <ctx.Action onClick={() => (clicked = true)}>favorite</ctx.Action>
            </box>
          )
        },
      },
    })

    return <Slot name="message_metadata" session_id="ses_test" message_id="msg_test" />
  }

  const app = await testRender(() => <App />)
  try {
    expect(links).toEqual(["https://example.test/ses_test/msg_test"])
    expect(actions).toHaveLength(1)
    actions[0]()
    expect(clicked).toBe(true)
  } finally {
    app.renderer.destroy()
  }
})
