import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { uploadProduct } from '../_actions/product_action';
import {auth} from '../_actions/user_action';
import Dropzone, { useDropzone } from 'react-dropzone'

function Upload(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData);
    const [Title,TitleState] = useState("");
    const [Price,PriceState] = useState(0);
    const [Images,ImageState] = useState([]);
    const [Option,OptionState] = useState("");
    const [Stock,StockState] = useState(0);

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
        OptionState(e.currentTarget.value);
    }
    const proStockHandler = (e) => {
        StockState(e.currentTarget.value)
    }
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({
        accept: '.jpeg,.png'
      });

    const onDropHandler = (files) => {
        const formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'},
            //어떤 타입의 파일인지 정의를 해줌 request 받을때 에러없이 받도록.
        }
        
        formData.append("file",files[0])

        axios.post("/api/product/image", formData, config)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
                ImageState([...Images,`${response.data.filePath}`])
                } else {
                console.log(response.data);
        }
    })
}
const onSubmitHandler = (e) => {
    e.preventDefault();
    
    let body = {
        writer:user._id,
        title: Title,
        price:Price,
        image: Images,
        stock: Stock
    }
    dispatch(uploadProduct(body))
    .then(response=> {
        if(response.payload.success) {
            props.history.push('/')
        } else {
            console.log(response.payload);
            console.log(Images);
            alert("Error")
        }
    })
}
    const onDeleteHandler = (e) => {
        ImageState([]);
    }

    return (
        <div className='productFormContainer'>
            <form onSubmit = {onSubmitHandler} className='productForm'>
                <label className='productLabel'>상품이미지</label>
                <br></br>
                <Dropzone className="inputDropzone" onDrop={onDropHandler}>
                    {({getRootProps, getInputProps}) => (
                        <section className='proInputSection'>
                        <div  {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className='uploadIconCon' id='newFile'><FontAwesomeIcon icon={faFileArrowUp} className="uploadIcon"/></div>
                        </div>
                        {
                            Images.map((file,index) => (
                                <div key={index} className="proInputImageCon">
                                    <img className="proInputImage"
                                      src={`http://localhost:5000/${file}`} onClick={onDeleteHandler}/>
                                </div>
                                ))
                        }
                        </section>
                    )}
                </Dropzone>
                <div className='dropzoneDesc'>이미지 파일만 업로드 가능 <br></br>클릭하거나 파일을 직접 드래그하세요.</div>
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
                <br></br>
                <label className='productLabel' >재고</label>
                <br></br>
                <input type="text" className='productInput' onChange={proStockHandler} value={Stock}/>
                <br></br><input type="submit" value="등록" className='productSubmit'/>

            </form>
        </div>
    )
}

export default Upload;