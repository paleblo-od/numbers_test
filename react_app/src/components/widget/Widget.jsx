import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Widget = ({type, response}) => {
    let resp;
    let data;
    // temporary amount of money
    const diff = Math.floor(Math.random() * 100);

  switch (response) {
        default:
            console.log(response)
            resp = {
            resp:response,
        }
        break;
    }
    console.log(resp.resp + '   fd')
    switch (type) {
        case 'orders':
            data = {
                title: 'КОЛИЧЕСТВО ЗАКАЗОВ',
                isMoney: false,
            }
            break;
        case 'earnings':
            data = {
                title: 'USD',
                isMoney: true,
                valute: '$',
            }
            break;
        case 'balance':
            data = {
                title: 'RUB',
                isMoney: true,
                valute: '₽',
            }
            break;
        default:
            break;
    }


    return (
        <div className='widget'>
            <div className='left'>
                <span className='title'>{data.title}</span>
                <span className='counter'>{data.isMoney && data.valute} {resp.resp}</span>
                <span className='link'>{data.link}</span>
            </div>
            <div className='right'>
                <div className="percentage positive">
                    <KeyboardArrowUpIcon/>
                    {diff}%
                </div>
            </div>
        </div>
    )
}

export default Widget