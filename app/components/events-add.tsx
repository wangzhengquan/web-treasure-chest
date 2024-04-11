 
import Script from 'next/script'
const code = `
dquery(document).on('change', '#left-panel-collapse-btn', function(e) {
  console.log('changed', e.target.checked);
  if (e.target.checked) {
    dquery('#left-panel').addClass('collapsed');
  }
  else {
    dquery('#left-panel').removeClass('collapsed');
  }
});


const openFloatLeftPanel = () => {
  dquery('#float-left-panel').addClass('opened');
  dquery('.backdrop-panel').addClass('opened');
}

const closeFloatLeftPanel = () => {
  dquery('#float-left-panel').removeClass('opened');
  dquery('.backdrop-panel').removeClass('opened');
}

dquery(document).on('click', '#open-float-left-panel-btn', function(e) {
  console.log('open-float-left-panel-btn clicked');
  openFloatLeftPanel()
});

dquery(document).on('click', '#close-float-left-panel-btn', function(e) {
  closeFloatLeftPanel()
});

dquery(document).on('click', '.backdrop-panel', function(event){
  closeFloatLeftPanel();
});

dquery(document).on('click', '.nav-link', function(event){
  closeFloatLeftPanel();
});
`
export default function EventsAdd({}) {
  return(
 
  
  <Script id="events-add-script">
  {/* {`console.log('events-add-script', dquery);`} */}
  </Script>
  
  );
}

 
 
