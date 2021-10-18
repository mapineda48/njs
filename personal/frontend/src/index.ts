const onErrorOld = window.onerror;

window.onerror = function (event, url, line, error) {
  if (!url && !line && !error) {
    // eslint-disable-next-line no-script-url
    window.location.href = "javascript:location.reload(true)";
    return;
  }

  if (onErrorOld) {
    return onErrorOld.call(this, event, url, line, error);
  }
};

// eslint-disable-next-line import/first
import "./web";
