import WorkStatus from '../../components/DashBoard/WorkStatus';
import DashBoardDate from '../../components/DashBoard/DashBoardDate';
import TaskSummary from '../../components/DashBoard/TaskSummary';
import TaskRateAdmin from '../../components/DashBoard/TaskRateAdmin';
import DailyTaskChartAdmin from '../../components/DashBoard/DailyTaskChartAdmin';
import admindata from '../../../admindata.json';
import data from '../../../comparedata.json';
import workerRateData from '../../../workerRateData.json';
import DailyChartAdmin from '../../components/DashBoard/DailyChartAdmin';
import WorkRateAdmin from '../../components/DashBoard/WorkerRateAdmin';

const AdminDashBoard = () => {
  return (
    <div style={{ background: 'white', height: '100%', paddingTop: '10px' }}>
      <div style={{ display: 'flex', marginLeft: '30px', marginRight: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
          <div style={{ display: 'flex', marginBottom: '25px' }}>
            <div>
              <DashBoardDate />
            </div>
            <div>
              <TaskSummary />
            </div>
          </div>
          <div style={{ display: 'flex', marginBottom: '25px' }}>
            <div>
              <WorkStatus />
            </div>
            <div>
              <TaskRateAdmin />
            </div>
          </div>
        </div>
        <div>
          <DailyTaskChartAdmin data={admindata} />
        </div>
      </div>
      <div style={{ display: 'flex', marginLeft: '29px' }}>
        <div>
          <DailyChartAdmin data={data} />
        </div>
        <WorkRateAdmin data={workerRateData} />
      </div>
    </div>
  );
};

export default AdminDashBoard;
