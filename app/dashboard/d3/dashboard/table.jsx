import { cn } from '@app/lib/utils';
export default function Table({
  title="模具进度",
  className = "",
}) {
  return (
    <div className={cn("bg-card px-[10px] pb-[10px]", className)}>
      <h3 className='py-[10px] font-bold'>{title}</h3>
      <table className="component-table" style={{height: "300px"}}>
        <thead>
          <tr style={{color: "rgb(30,138,136)"}}>
            <th>序号</th>
            <th>模具编号</th>
            <th>版本号</th>
            <th>类型</th>
            <th style={{textAlign: 'center'}}>进度</th>
          </tr>
        </thead>
        <tbody className='bg-card-body'>
          {
            Array.from({ length: 9 }, (_, i) => i ).map(i => 
              <tr key={i}>
                <td>{i+1}</td>
                <td>FK{i+1}</td>
                <td>V{i+1}</td>
                <td>修模</td>
                <td>
                  
                  <div style={{ float: "right", paddingLeft: 2, width: "50px" }}>
                    
                    <div style={{ width: "100%", float: "left" }}>
                      <div
                        className=""
                        style={{ width: `${100 - i*10}%`, backgroundColor: "rgb(66, 133, 244)" }}
                      >
                        <br />
                      </div>
                    </div>
                  </div>
                  <span className="float-right">{100 - i*10}%</span>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}