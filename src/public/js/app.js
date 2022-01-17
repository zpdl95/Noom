/* ws = protocol 이름 */
/* window.location.host = localhost:3000 */
/* new WebSocket = frontend에서 웹소켓에 연결시도 */
const socket = new WebSocket(`ws://${window.location.host}`);
