import { useEffect, useState } from 'react'
import Layout from './compoentns/Layout';
import Button from './compoentns/Button';
import { PromiseType } from './types';
import { getPromiseCallByType } from './apis';

function App() {
  const [promiseType, setPromiseType] = useState<PromiseType>('init')
  

  const fetchPromiseData = async (t: PromiseType) => {
    const r = await getPromiseCallByType(t)
    return r
  }

  useEffect(() => {
    if (promiseType !== 'init') {
      const t = fetchPromiseData(promiseType)
      
      t.then(console.log);
    }
  }, [promiseType])

  

  const onChangePromiseType = (value: PromiseType) => {
    setPromiseType(value)
  }

  return (
    <Layout>
      <div className='h-20 border-black grid grid-flow-col gap-10 my-5 '>
        <Button title='init' value='init' loading={false} onClick={onChangePromiseType} />
        <Button title='any' value='any' loading={false} onClick={onChangePromiseType} />
        <Button title='all' value='all' loading={false} onClick={onChangePromiseType} />
        <Button title='race' value='race' loading={false} onClick={onChangePromiseType} />
        <Button title='settled' value='settled' loading={false} onClick={onChangePromiseType} />
      </div>
      <div className='h-20 border-[1px] border-blue-200 flex justify-center items-center'>
        <span className='font-bold text-5xl'>
          {promiseType}
        </span>
      </div>
    </Layout>
  )
}

export default App
