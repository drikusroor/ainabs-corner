---
title: "React modal component styled with TailwindCSS in TypeScript"
date: "2023-11-22"
categories: 
  - "notebook"
tags: 
  - "tailwindcss"
  - "react"
  - "modal"
---

This React component provides a flexible and animated modal dialog, using Tailwind CSS for styling. It's designed to be easily integrated into any React project that already includes Tailwind CSS for its styling needs.

## Features:

* **Animations**: Smooth transition for opening and closing the modal with fade and translation effects.
* **Backdrop**: Includes a clickable backdrop that closes the modal, enhancing the user experience and interaction.
* **Accessibility**: Implements focus management and can be closed with the Escape key, adhering to good accessibility practices.
* **Customizable**: Supports optional props to customize the title, confirm and cancel button texts, and their respective event handlers.

## Props:

* `title` (string): The title displayed at the top of the modal.
* `confirmButtonText` (string): Custom text for the confirm button.
* `cancelButtonText` (string): Custom text for the cancel button.
* `onConfirm` (function): Handler called when the confirm button is clicked.
* `onCancel` (function): Handler called when the cancel button is clicked or the backdrop is clicked.

## Tests:

A comprehensive suite of tests accompanies the modal component, ensuring its reliability and functionality. The tests are written using Jest and React Testing Library, covering the following:

* Rendering based on `isOpen` prop.
* Display of title and custom button texts.
* Callback execution on backdrop click and Escape key press.
* Proper behavior of animations and transitions.
* Delayed unmounting with timeout to allow for closing animation.

## Usage:

To use the modal, import the component and include it in your component tree. Control its visibility with the isOpen prop and provide handlers for `onConfirm` and `onCancel` to determine the modal's behavior in response to user actions.

```tsx
<Modal
  isOpen={modalIsOpen}
  title="Confirmation"
  confirmButtonText="Yes"
  cancelButtonText="No"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
>
  Are you sure you want to proceed?
</Modal>
```

## Modal component:

```tsx
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react'

import classNames from 'src/lib/class-names'

interface ModalProps {
  isOpen: boolean
  children?: React.ReactNode
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: () => void
  onCancel: () => void
}

type RenderState = 'open' | 'opening' | 'closed' | 'closing'

const Modal = ({
  children,
  isOpen,
  title = '',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  onConfirm,
  onCancel,
}: ModalProps) => {
  const [renderState, setRenderState] = useState<RenderState>('closed')

  useEffect(() => {
    if (isOpen) {
      if (renderState !== 'closed') {
        return
      }
      setRenderState('opening')
      setTimeout(() => setRenderState('open'), 50)
    } else {
      if (renderState !== 'open') {
        return
      }
      setRenderState('closing')
      setTimeout(() => setRenderState('closed'), 300)
    }
  }, [isOpen, renderState])

  if (renderState === 'closed') {
    return null
  }

  return (
    <div
      className={classNames(
        'fixed inset-0 h-full w-full overflow-y-auto bg-gray-600/50 transition-opacity',
        renderState === 'open' ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
      onClick={onCancel}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onCancel()
        }
      }}
      role="presentation"
    >
      <div
        className={classNames(
          'relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg transition-transform',
          renderState === 'open' ? 'translate-y-0' : '-translate-y-4'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {title && (
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
          )}
          {children && <p className="text-sm text-gray-500">{children}</p>}
        </div>

        <div className="mt-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="mb-1 mr-1 rounded bg-red-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none hover:shadow-md focus:outline-none active:bg-red-600"
              style={{ transition: 'all .15s ease' }}
            >
              {cancelButtonText || 'Cancel'}
            </button>
          )}

          {onConfirm && (
            <button
              onClick={onConfirm}
              className="mb-1 mr-1 rounded bg-green-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none hover:shadow-md focus:outline-none active:bg-green-600"
              style={{ transition: 'all .15s ease' }}
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
```

## Modal component unit tests:

```ts
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  it('renders successfully', () => {
    const onCancel = jest.fn()
    expect(() => {
      render(<Modal isOpen onCancel={onCancel} />)
    }).not.toThrow()
  })

  it('renders the modal when `isOpen` is true', () => {
    render(<Modal isOpen onCancel={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('does not render the modal when `isOpen` is false', () => {
    render(<Modal isOpen={false} onCancel={() => {}} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the title when provided', () => {
    const title = 'Test Modal Title'
    render(<Modal isOpen title={title} onCancel={() => {}} />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('calls `onCancel` when the backdrop is clicked', () => {
    const onCancel = jest.fn()
    render(<Modal isOpen onCancel={onCancel} />)
    fireEvent.click(screen.getByRole('presentation'))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('calls `onCancel` when the escape key is pressed', () => {
    const onCancel = jest.fn()
    render(<Modal isOpen onCancel={onCancel} />)
    fireEvent.keyDown(screen.getByRole('presentation'), {
      key: 'Escape',
      code: 'Escape',
    })
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('does not call `onCancel` when the modal content is clicked', () => {
    const onCancel = jest.fn()
    render(<Modal isOpen onCancel={onCancel} />)
    fireEvent.click(screen.getByRole('dialog'))
    expect(onCancel).not.toHaveBeenCalled()
  })

  it('calls `onConfirm` when the confirm button is clicked', () => {
    const onConfirm = jest.fn()
    render(<Modal isOpen onConfirm={onConfirm} onCancel={() => {}} />)
    fireEvent.click(screen.getByText('Confirm'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('displays custom button texts when provided', () => {
    const confirmText = 'Yes, I’m sure'
    const cancelText = 'No, cancel'
    render(
      <Modal
        isOpen
        confirmButtonText={confirmText}
        cancelButtonText={cancelText}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )
    expect(screen.getByText(confirmText)).toBeInTheDocument()
    expect(screen.getByText(cancelText)).toBeInTheDocument()
  })

  it('transitions to closed state after a delay when `isOpen` is set to false', async () => {
    jest.useFakeTimers()
    const { rerender } = render(<Modal isOpen onCancel={() => {}} />)
    rerender(<Modal isOpen={false} onCancel={() => {}} />)

    fireEvent.transitionEnd(screen.getByRole('presentation'))
    jest.advanceTimersByTime(300) // Advance timers by the length of your transition

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    )
    jest.useRealTimers()
  })

  it('adds an "-translate-y-4" class to the modal when it is in the process of opening', () => {
    render(<Modal isOpen onCancel={() => {}} />)
    expect(screen.getByRole('dialog')).toHaveClass('-translate-y-4')
  })

  it('adds a "-translate-y-4" class to the modal when it is in the process of closing', () => {
    jest.useFakeTimers()
    const { rerender } = render(<Modal isOpen onCancel={() => {}} />)
    rerender(<Modal isOpen={false} onCancel={() => {}} />)
    jest.advanceTimersByTime(50)

    expect(screen.getByRole('dialog')).toHaveClass('-translate-y-4')

    jest.useRealTimers()
  })
})
```

## See also:

[Github gist](https://gist.github.com/drikusroor/1efe8321ca45a12219ed0e7432cc0b45)