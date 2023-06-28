export default function intilitizeFnEffects() {
    if(localStorage.getItem("plans") != null && localStorage.getItem("plan_index") != null){
    //   setPlanIndex(Number.parseInt(localStorage.getItem("plan_index") || "0"))
    //   setPlan(JSON.parse(localStorage.getItem("plans") || "{0:{data:[]}}"))
    }

    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
      // special hack to prevent zoom-to-tabs gesture in safari
        document.body.style.scale = "1";
    });
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
        // special hack to prevent zoom-to-tabs gesture in safari
        document.body.style.scale = "1";
    });
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
        // special hack to prevent zoom-to-tabs gesture in safari
        document.body.style.scale = "1";
    });
}