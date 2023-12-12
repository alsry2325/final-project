import ApproverChoice from "../../items/approvalItems/ApproverChoice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";

function BDWriteForm({ myPageInfo }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInput = useRef();
    const [fileUrl, setfileUrl] = useState('');

    const today = new Date();
    const customDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    /* 파일 업로드 시 input type file이 클릭 되도록 하는 이벤트 */
    const onClickFileUpload = () => {
        fileInput.current.click();
    }

    /* 파일 첨부 */
    const onChangeFileUpload = () => {
        const files = fileInput.current.files;
        const fileUrls = [];

        for (let i = 0; i < files.length; i++) {
            const fileReader = new FileReader();
            fileReader.onload = e => {
                const {result} = e.target;
                if (result) fileUrls.push(result);

                // 만약 마지막 파일이면, state를 업데이트합니다
                if (i === files.length - 1) {
                    setfileUrl(fileUrls);
                }
            };
            fileReader.readAsDataURL(files[i]);
        }
    };

    return(
        <>
            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">업무기안서</h3>
                    <div className="approver-list">
                        <ApproverChoice/>
                    </div>
                </div>
                <div className="approval-body">
                    <table className="draftInfo">
                        <tbody>
                        <tr>
                            <td className="app-table-info">기안자</td>
                            <td>{myPageInfo.emplyName}</td>
                            <td className="app-table-info">부서</td>
                            <td>{myPageInfo.department}</td>
                        </tr>
                        <tr>
                            <td className="app-table-info">기안일</td>
                            <td>{customDate}</td>
                            <td className="app-table-info">문서번호</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="app-table-info">제목</td>
                            <td colSpan={"3"}>
                                <input
                                    className="approval-title"
                                    type="text"
                                    name="title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="app-table-info">상세 내용</td>
                            <td colSpan={"3"}>
                                <textarea
                                    className="businessDraftContent"
                                    type="text"
                                    name="businessDraftContent"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="approval-file-div">
                    <h5>파일첨부</h5>
                    <input
                        style={{display: 'none'}}
                        type="file"
                        name='approvalFile'
                        ref={fileInput}
                        onChange={ onChangeFileUpload }
                        multiple        // 여러 파일 선택을 허용
                    />
                    <div
                        className="approval-file"
                        onClick={ onClickFileUpload }
                    >
                        <img className="approval-attach-img"
                            src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/9db9634b-1962-4ebf-89b8-7f0c327af689"/>
                        파일 선택</div>
                </div>
            </div>
        </>
    );
}

export default BDWriteForm;