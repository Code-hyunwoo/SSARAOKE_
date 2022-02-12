import axios from "axios";
// import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
// import { connect } from "react-redux";
import { Router, unstable_HistoryRouter, useHref, useNavigate } from "react-router-dom";
import Styles from "./RoomPw.module.css";

// function RoomPw({roomseq, show, onHide}) { //숏컷 연산
function RoomPw(props) { //위의 숏컷 연산이 props안에 다 들어있음.
  //room 비밀번호용 - MainLobby로 이사예정
  // const [roompwShow, setRoompwShow] = React.useState(false);

  // console.log(roomseq, show, onHide);
  console.log("props",props);
  console.log(props.onHide);

  const { onHide } = props;
  
  //사용자가 입력한 비번
  const [enterpw, setEnterpw] = useState("");
  const getPW = (e) => {
    setEnterpw(e.target.value); //이게 이제 roomTitle을 이 값으로 지정한 것.
    console.log(enterpw); //한글자 칠때마다 콘솔이 우수수 찍힘
  };

  //db에서 받아온 찐 비번
  // const [realpw, setRealpw] = useState("");

  //여기서 입력을 누를때 값을 넘기고, 값이 맞으면 그때 네비게이션으로 페이지 넘기기
  // const navigate = useNavigate();
//useHref() 써보기

  // const goroonin = useHref();
  // const history = unstable_HistoryRouter();
  // const roomin = navigate("/basic");

  //성공이면 방 입장
  // const goroom = () => navigate("/basic")

  // 정상입장: {200, “Success”}
// 입장거절: {402, "차단된 사용자"}, {403, "방 정원초과"}, {404, "비밀번호 불일치"}, {405, "존재하지 않는 방"}
  //방 입장하려고 값 보내기
  // alert("방번호: "+roomseq, "비밀번호: "+enterpw);
  const EnterRoom = (e) => {
    // alert("방번호: "+roomseq, "비밀번호: "+enterpw);
    axios //-> 500에러 발생
    .post(
      "https://i6a306.p.ssafy.io:8080/api/v1/lobby/enter",
      {
        room_seq: parseInt(props.roomseq),
        password: enterpw,
      },
      {
        headers:{
          "Content-Type": "application/json",
          Authorization: props.state[0].token, // -> (헤란 토큰)승인. 토큰을 넣어 보내야, 백에서 승인해서 보내줌
          // Authorization: state[0].token, // -> (헤란 토큰)승인. 토큰을 넣어 보내야, 백에서 승인해서 보내줌
        },
      }
    )
    .then((res) => {
      // console.log(res);
      console.log(res.data);
      // alert("res값"+res.data);
      // alert("방번호: ",roomseq, "비밀번호: ", enterpw);
      if(res.status === 200){
        alert("입장 성공!!")
      }
      else if(res.status !== 200){
        alert("입장 실패!"); //왜 안되냐
      }
    }
    );
    // navigate("/basic")
  };


  return (
    <div>
      {/* onClick={() => setRoompwShow(true)} */}
      {/* <RoomPw 
                show={roompwShow} 
                onHide={() => setRoompwShow(false)}
            /> */}

      <Modal
        // {onHide}
        {...props}
        // size="sm"
      >
        {/* <div className={Styles.bigtable}> */}
        {/* <div> */}
          <div className={Styles.bigtable}>
            <Modal.Body className={Styles.createroombg}>
              <div className={Styles.inputPW}>
                <span className={Styles.hfont}>비밀번호: &nbsp;</span>
                <input
                  className={Styles.inputbox}
                  id="roompw"
                  name="roompw"
                  type="password"
                  onChange={getPW}
                  placeholder=" 비밀번호를 입력하세요"
                ></input>
                &nbsp;
                <button className={Styles.button} onClick={EnterRoom}>
                  입력
                </button>
                {/* <Link to="/lobby"> */}
                <button className={Styles.button} onClick={onHide}>
                {/* <button className={Styles.button} onClick={props.onHide}> */}
                {/* <button className={Styles.button}> */}
                  닫기
                </button>
                {/* </Link> */}
              </div>
            </Modal.Body>
          </div>
        {/* </div> */}
      </Modal>
    </div>
  );
}
// function mapStateToProps(state) { //state 받아오는 함수 - store에서 직빵으로 값 보내주는 것.
//   return { state };
// }

// export default connect(mapStateToProps, null)(RoomPw);
export default RoomPw;
