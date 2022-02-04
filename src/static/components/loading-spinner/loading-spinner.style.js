const style = document.createElement('style');

style.textContent = `
.ellipsis-loader {
    display: inline-block;
    width: 50px;
    height: 10px;
    margin-right: 10px;
    position: relative;
  }
  .ellipsis-loader div {
    background: #c8c8c8;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 0;
    border-radius: 50%;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .ellipsis-loader div:nth-child(1) {
    left: 5px;
    animation: ellipsis-loader1 0.6s infinite;
  }
  .ellipsis-loader div:nth-child(2) {
    left: 5px;
    animation: ellipsis-loader2 0.6s infinite;
  }
  .ellipsis-loader div:nth-child(3) {
    left: 20px;
    animation: ellipsis-loader2 0.6s infinite;
  }
  .ellipsis-loader div:nth-child(4) {
    left: 35px;
    animation: ellipsis-loader3 0.6s infinite;
  }
  @keyframes ellipsis-loader1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes ellipsis-loader3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes ellipsis-loader2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(15px, 0);
    }
  }`

  export default style;