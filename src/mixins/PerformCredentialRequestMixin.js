const WAIT_TIME = 1000;

export default {
  props: {
    requestId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: "started",
    };
  },
  sockets: {
    connect() {
      console.log("Connecting to backend");
      this.$socket.emit("started", this.requestId);
    },
    update(status) {
      console.log("Received new status from backend");
      this.status = status;
    },
    redirect({ status, redirectUrl }) {
      console.log("Received redirect", status);
      this.status = status;
      setTimeout(() => (window.location = redirectUrl), WAIT_TIME);
    },
  },
};
