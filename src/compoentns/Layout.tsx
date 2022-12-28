import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode}) {
  return (
    <div className='bg-slate-100 min-w-full min-h-screen '>
      <div className="max-w-5xl flex flex-col mx-auto">
        <main className="flex-1">{children}</main>
      </div>
    </div>
    
  )
}

export default Layout