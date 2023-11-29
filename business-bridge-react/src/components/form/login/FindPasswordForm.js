function FindPasswordForm() {

    return(
        <div>
            <div className="page">
                <div className="cover">
                    <img className="main-Image" src="/images/mainImage.png" alt="My Image" />
                    <h1>BusinessBridge</h1>
                    <input
                        type="text"
                        name="emplyId"
                        placeholder="사원번호"

                    />
                    <input
                        type="password"
                        name="emplyEmail"
                        placeholder="이메일"

                    />
                    <div className="login-btn"
                    >임시 비밀번호전송 dfdf</div>

                </div>
            </div>
        </div>
    );
}

export default FindPasswordForm;