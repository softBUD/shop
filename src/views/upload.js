import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'

function Upload() {
    const [Title,TitleState] = useState("");
    const [Price,PriceState] = useState(0);
    const [Images,ImageState] = useState([]);
    const [Option,OptionState] = useState("");

    const proTitleHandler = (e) => {
        TitleState(e.currentTarget.value);
    }
    const proOptionAutoHandler = (e) => {
        const autoOp = e.currentTarget.value;
        OptionState(autoOp+"[1개]");
    }
    const proPriceHandler = (e) => {
        PriceState(e.currentTarget.value);
    }
    const proOptionHandler = (e) => {
        OptionState(Title);
        OptionState(e.currentTarget.value);
    }
    const onDropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
            //어떤 타입의 파일인지 정의를 해줌 request 받을때 에러없이 받도록.
        }
        
        formData.append("file",files[0])

        axios.post("/api/product/image", formData, config)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
        } else {
            alert("파일저장에 실패했습니다.")
        }
    })
}
    return (
        <div className='productFormContainer'>
            <form className='productForm'>
                <label className='productLabel'>상품이미지</label>
                <br></br>
                <Dropzone onDrop={onDropHandler}>
                    {({getRootProps, getInputProps}) => (
                        <section className='imagefileForm'>
                        <div  {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className='uploadIconContainer'><FontAwesomeIcon icon={faFileArrowUp} className="uploadIcon"/></div>
                        </div>
                        </section>
                    )}
                </Dropzone>
                <br></br>
                <label className='productLabel'>상품명</label>
                <br></br>
                <input type="text" className='productInput'onChange={(e)=>{proTitleHandler(e); proOptionAutoHandler(e);}} value={Title}/>
                <br></br>
                <label className='productLabel' >가격</label>
                <br></br>
                <input type="text" className='productInput' onChange={proPriceHandler} value={Price}/>
                <br></br>
                <label className='productLabel' >옵션</label>
                <br></br>
                <input type="text" className='productInput' onChange={proOptionHandler} value={Option}/>
                <br></br><button className='productSubmit'>등록</button>
            </form>
        </div>
    )
}

export default Upload;