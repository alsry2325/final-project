import {useEffect, useState} from "react";
import {format} from "date-fns";
import ApproverUpdateBD from "../../items/approvalItems/ApproverUpdateBD";

function BDUpdateForm({businessDraft, form, setForm, fileInput}) {

    const [fileUrl, setFileUrl] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 초기 값을 form 상태에 설정
        if (!form.title || !form.businessDraftContent) {
            setForm({
                // ...businessDraft,
                title: businessDraft.title || '',
                businessDraftContent: businessDraft.businessDraftContent || '',
                approvers: businessDraft.approvers || ''
            });
        }
        // 파일 목록을 업데이트한 후, 파일 인풋에도 반영
        const updatedFileUrls = businessDraft.attachFiles.map(file => file.fileUrl);
        setFileUrl(updatedFileUrls);
        setAttachedFiles(businessDraft.attachFiles.map(file => file.fileName));
    }, [businessDraft, form, setForm]);

    // 입력 양식 값 변경 시 state 수정
    const onChangeHandler = e => {
        const { name, value } = e.target;
        setForm({
                ...form,
                [name]: value
        });
    };

    // 파일 업로드 시 input type file이 클릭 되도록 하는 이벤트
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

        // 수정된 파일 목록을 state에 반영
        setAttachedFiles(updatedFiles);

        // 파일 목록을 업데이트한 후, 파일 인풋에도 반영
        const updatedFileUrls = updatedFiles.map((fileName, i) => fileUrl[i]);
        setFileUrl(updatedFileUrls);
    };




    return (
        <>
            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">업무기안서</h3>
                    <div className="approver-list">
                        <ApproverUpdateBD businessDraft={businessDraft} form={form} setForm={setForm}/>
                    </div>
                </div>
                <div className="approval-body">
                    <table className="draftInfo">
                        <tbody>
                        <tr>
                            <td className="app-table-info">기안자</td>
                            <td>{businessDraft.drafterName}</td>
                            <td className="app-table-info">부서</td>
                            <td>{businessDraft.departmentName}</td>
                        </tr>
                        <tr>
                            <td className="app-table-info">기안일</td>
                            <td>{format(new Date(businessDraft.draftDateTime), 'yy-MM-dd')}</td>
                            <td className="app-table-info">문서번호</td>
                            <td>{businessDraft.docNo}</td>
                        </tr>
                        <tr>
                            <td className="app-table-info">제목</td>
                            <td colSpan={"3"}>
                                <input
                                    name='title'
                                    className="approval-title"
                                    type="text"
                                    value={form.title}
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="app-table-info">상세 내용</td>
                            <td colSpan={"3"}>
                                <textarea
                                    name='businessDraftContent'
                                    className="businessDraftContent"
                                    type="text"
                                    value={form.businessDraftContent}
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="approval-file-div">
                    <h5>파일첨부</h5>
                    <input
                        name='attachFiles'
                        style={{display: 'none'}}
                        type="file"
                        ref={fileInput}
                        onChange={onChangeFileUpload}
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
                            businessDraft.attachFiles &&
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
                                    {/*{businessDraft.attachFiles.map((file, index) => (*/}
                                    {/*    <div key={index} className="app-file-name">*/}
                                    {/*        <img*/}
                                    {/*            className="cancel-attach"*/}
                                    {/*            src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/e5019604-ff4b-40b3-8bbd-cfe351fcfaae"*/}
                                    {/*            alt="cancel"*/}
                                    {/*            onClick={() => handleCancelFile(index)}*/}
                                    {/*        />*/}
                                    {/*        {file.fileName}*/}
                                    {/*    </div>*/}
                                    {/*))}*/}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default BDUpdateForm;