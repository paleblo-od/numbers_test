import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';




const Chart = ({response}) => {
    const data = [
  { name: 'Январь', total: response.y},
  { name: 'Февраль', total: 3000 },
  { name: 'Март', total: 1002 },
  { name: 'Апрель', total: 900 },
  { name: 'Май', total: 500 },
  { name: 'Июнь', total: 3200 },
  { name: 'Июль', total: 1200 },
  { name: 'Август', total: 1200 },
  { name: 'Сентябрь', total: 1200 },
  { name: 'Октябрь', total: 1200 },
  { name: 'Декабрь', total: 1200 },

];
  return (
    <div className='chart'>
      <div className="title">Доxоды по месяцам</div>
        <ResponsiveContainer width="100%" aspect={2/1}>
        <AreaChart width={'100%'} height={250} data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />     
        </AreaChart>                 
      </ResponsiveContainer>
    </div>
  )
}

export default Chart