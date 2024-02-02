import {useEffect, useState} from "react";
import ApproverUpdateER from "../../items/approvalItems/ApproverUpdateER";

function ERUpdateForm({ expenseReport, form, setForm, fileInput }) {

    const [fileUrl, setFileUrl] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [detailsData, setDetailsData] = useState([
        { item: '', amount: '', note: '' }
    ]);

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 초기 값을 form 상태에 설정
        if (!form.title) {
            setForm({
                // ...expenseReport,
                title: expenseReport.title || '',
                approvers: expenseReport.approvers || '',
                totalExpenditure: expenseReport.totalExpenditure || '',
                details: expenseReport.details || ''
            });
        }
    }, [form, setForm]);


    // 입력 양식 값 변경 시 state 수정
    const onChangeHandler = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    // 지출 상세 내역 가공처리
    const addRow = () => {
        setDetailsData([...detailsData, { item: '', amount: '', note: '' }]);
    };

    const removeRow = (index) => {
        const updatedDetails = [...detailsData];
        updatedDetails.splice(index, 1);
        setDetailsData(updatedDetails);
    };

    const handleDetailChange = (e, index, field) => {
        const updatedDetails = [...detailsData];
        updatedDetails[index][field] = e.target.value;
        setDetailsData(updatedDetails);
        setForm({
            ...form,
            "expenseReportDetailCreateRequests" : updatedDetails
        });
    };

    /* 파일 업로드 시 input type file이 클릭 되도록 하는 이벤트 */
    const onClickFileUpload = () => {
        fileInput.current.click();
    }

    // 파일 첨부 시 동작 이벤트
    const onChangeFileUpload = () => {
        const files = fileInput.current.files;
        const fileUrls = [];
        const fileNames = [];

        for (let i = 0; i < files.length; i++) {
            const fileReader = new FileReader();
            fileReader.onload = e => {
                const {result} = e.target;
                if (result) fileUrls.push(result);

                // 파일 이름을 추출하여 배열에 추가
                fileNames.push(files[i].name);

                // 마지막 파일이면, state를 업데이트
                if (i === files.length - 1) {
                    setFileUrl(fileUrls);
                    setAttachedFiles(fileNames);
                }
            };
            fileReader.readAsDataURL(files[i]);
        }
    };

    // 파일 첨부 취소
    const handleCancelFile = (index) => {
        const updatedFiles = [...attachedFiles];
        updatedFiles.splice(index, 1);
        setAttachedFiles(updatedFiles);
    };

    const handleCancelViewFile = (index) => {
// 기존의 attachFiles 배열에서 해당 인덱스의 파일을 제거
        const updatedAttachFiles = [...expenseReport.attachFiles];
        updatedAttachFiles.splice(index, 1);

        // state 업데이트
        setForm({
            ...form,
            attachFiles: updatedAttachFiles
        });
    };


    return(
        <>
            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">지출결의서</h3>
                    <div className="approver-list">
                        <ApproverUpdateER expenseReport={expenseReport} form={form} setForm={setForm}/>
                    </div>
                </div>

                <div className="approval-body">
                    <table className="draftInfo">
                        <tbody>
                        <tr>
                            <th className="app-table-info">기안자</th>
                            <td>{expenseReport.drafterName}</td>
                            <th className="app-table-info">부서</th>
                            <td>{expenseReport.departmentName}</td>
                        </tr>
                        <tr>
                            <th className="app-table-info">기안일</th>
                            <td>{expenseReport.draftDateTiem}</td>
                            <th className="app-table-info">문서번호</th>
                            <td>{expenseReport.docNo}</td>
                        </tr>
                        <tr>
                            <th className="app-table-info">지출금액</th>
                            <td colSpan={"3"}>₩.
                                <input
                                    name='totalExpenditure'
                                    className="total-expenditure"
                                    type="number"
                                    value={form.totalExpenditure}
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="app-table-info">제목</th>
                            <td colSpan={"3"}>
                                <input
                                    name='title'
                                    className="approval-title"
                                    type="text"
                                    value={form.title}
                                    onChange={onChangeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="app-table-info">내역</th>
                            <td colSpan={"3"} style={{padding:"0"}}>
                            <table className="ER-detail-table">
                                <tbody>
                                <tr>
                                    <td className="app-table-info">적요</td>
                                    <td className="app-table-info">금액</td>
                                    <td className="app-table-info">비고</td>
                                    <div>
                                        <button onClick={addRow}>행추가</button>
                                    </div>
                                </tr>
                                {/* 기존 지출 상세 내역 조회 */}
                                {expenseReport.details &&
                                    expenseReport.details.map((detail, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                className={`ERdetail-input item-${index}`}
                                                type="text"
                                                value={detail.item}
                                                onChange={(e) => handleDetailChange(e, index, 'item')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className={`amount-${index}`}
                                                type="text"
                                                value={detail.amount}
                                                onChange={(e) => handleDetailChange(e, index, 'amount')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className={`note-${index}`}
                                                type="text"
                                                value={detail.note}
                                                onChange={(e) => handleDetailChange(e, index, 'note')}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => removeRow(index)}>행 삭제</button>
                                        </td>
                                    </tr>
                                ))}
                                {detailsData.map((detail, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                className={`ERdetail-input item-${index}`}
                                                type="text"
                                                value={detail.item}
                                                onChange={(e) => handleDetailChange(e, index, 'item')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className={`amount-${index}`}
                                                type="text"
                                                value={detail.amount}
                                                onChange={(e) => handleDetailChange(e, index, 'amount')}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className={`note-${index}`}
                                                type="text"
                                                value={detail.note}
                                                onChange={(e) => handleDetailChange(e, index, 'note')}
                                            />
                                        </td>
                                        <td>
                                            <div>
                                                <button onClick={() => removeRow(index)}>행 삭제</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
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
                    <div className="approval-file">
                        <div
                            className="approval-file-add"
                            onClick={onClickFileUpload}
                        >
                            <img className="approval-attach-img"
                                 src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/9db9634b-1962-4ebf-89b8-7f0c327af689"/>
                            파일 선택
                        </div>
                        {
                            expenseReport.attachFiles &&
                            <>
                                <div className="shorter-line-div"/>
                                <div className="app-attach-files-div">
                                    {attachedFiles.map((fileName, index) => (
                                        <div key={index} className="app-file-name">
                                            <img
                                                className="cancel-attach"
                                                src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/e5019604-ff4b-40b3-8bbd-cfe351fcfaae"
                                                alt="cancel"
                                                onClick={() => handleCancelFile(index)}
                                            />
                                            {fileName}
                                        </div>
                                    ))}
                                    {/* 기존 값 조회 */}
                                    {expenseReport.attachFiles.map((file, index) => (
                                        <div key={index} className="app-file-name">
                                            <img
                                                className="cancel-attach"
                                                src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/e5019604-ff4b-40b3-8bbd-cfe351fcfaae"
                                                alt="cancel"
                                                onClick={() => handleCancelViewFile(index)}
                                            />
                                            {file.fileName}
                                        </div>
                                    ))}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ERUpdateForm;