import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    </>
  )
}

export default App


/*
Build a LikeButton component that:

Shows a like count and a button.
On click, immediately updates the UI (increment/decrement count, toggle "liked" state) — before waiting for any server confirmation ("optimistic update").
Calls an async onToggleLike: () => Promise<boolean> prop (true = server confirmed success, false = server rejected it).
If the promise resolves false, revert the UI back to its state before the click.
Prevent double-clicks/spamming while a toggle request is already in flight.
typescript
type LikeButtonProps = {
  initialLiked: boolean;
  initialCount: number;
  onToggleLike: () => Promise<boolean>;
};
*/