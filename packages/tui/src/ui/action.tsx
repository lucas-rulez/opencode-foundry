import type { JSX } from "solid-js"
import type { RGBA } from "@opentui/core"

export type ActionProps = {
  onClick: () => void
  children?: JSX.Element | string
  fg?: RGBA
  bg?: RGBA
}

export function Action(props: ActionProps) {
  return (
    <text
      fg={props.fg}
      bg={props.bg}
      onMouseUp={() => {
        props.onClick()
      }}
    >
      {props.children}
    </text>
  )
}
