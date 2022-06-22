import './feature.scss'
import 'react-circular-progressbar/dist/styles.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';


const Feature = ({response}) => {
  return (
    <div className='feature'>
        <div className="top">
          <h1 className="title">Прогресс</h1>
          <MoreVertIcon fontSize='small' />
        </div>
        <div className="bottom">
          <div className="featureChart">
            <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
          </div>
            <p className="title">
              Доxод за день
            </p>
            <p className="amount">
                {response}
            </p>
        </div>
    </div>
  )
}

export default Feature