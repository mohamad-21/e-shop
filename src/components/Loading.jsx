import { Puff } from 'svg-loaders-react';

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <Puff />
    </div>
  )
}

export default Loading