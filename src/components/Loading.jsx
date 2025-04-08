import { CircleLoader } from 'react-spinners'

export const Loading = () => {
  return (
    <div className="grid min-h-screen min-w-full place-content-center">
      <CircleLoader size={150} color={'#36D7B7'} />
    </div>
  )
}
