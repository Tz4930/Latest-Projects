import { useParams } from 'react-router-dom';

export default function User() {
  const {userId} = useParams();

  // console.log(params)

  return (
    <p>User page {userId} </p>
  )
}