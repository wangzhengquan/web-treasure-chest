import Loading from '@app/components/loading';

// const LoadingPage = function () {
//   return (
//     <div className="grid h-full w-full place-content-center">
//       <Loading />
//     </div>
//   )
// }
const LoadingPage = () => <Loading style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}/>

export default LoadingPage;
