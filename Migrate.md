# Migrating to 0.3

## Wrapping behavior

Before version 0.3 modal contents were wrapped automatically
by default unless one explicitly set `noWrap={true}` via props.

However, in 0.3 default wrapping was disabled. Simple fix
would be to add `autoWrap` prop to all modals that didn't use
`noWrap`. For modals that had `noWrap` set to `true` one can
remove the prop entirely.


## onRequestClose

In version 0.3 `onRequestClose` was removed and `onCancel`
now also handles the logic for `onRequestClose`.

To migrate just replace all `onRequestClose` props with `onCancel`.

Note: If the old modals already have an handler for `onCancel` and
      the behavior of the listeners (cancel, requestClose) is different
      one can merge their logic inside onCancel handler. To differentiate
      between escape press and close/backdrop click use the second argument
      passed to the listener.
