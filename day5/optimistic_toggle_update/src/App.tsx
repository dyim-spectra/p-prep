import { useState, useEffect, } from 'react'
import LikeButton from './components/LikeButton'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const getCount = async (): Promise<{ likedCount: number; likedByMe: boolean }> => {
      const delay = Math.random() * 500 + 500
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ likedCount: 100, likedByMe: false })
        }, delay)
      });
    }

    const loadCount = async () => {
      setIsLoading(true)
      try {
        const { likedCount, likedByMe } = await getCount()
        setCount(likedCount)
        setLiked(likedByMe)
      } catch {
        console.log('there was an error')
      } finally {
        setIsLoading(false)
      }
    }
    loadCount()
  }, [])

  const handleLike = async () => {
    setIsLoading(true);
    const preLike = liked
    const preCount = count
    setLiked(!liked);
    if (preLike) {
      setCount(preCount - 1)
    } else {
      setCount(preCount + 1)
    }


    let res = false;
    try {
      res = await mockApiLike()
 

    } catch {
      setLiked(preLike)
      setCount(preCount)
    } finally {
      setIsLoading(false)
    }
    return res
  }


  const mockApiLike = async (): Promise<boolean> => {
    const delay = Math.random() * 500 + 500
    const randomBoolean = Math.random() >= 0.5;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(randomBoolean)
      }, delay)
    });
  }




  return <LikeButton onToggleLike={handleLike} initialCount={count} initialLiked={liked} isLoading={isLoading} />

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