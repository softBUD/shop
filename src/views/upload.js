import { faSpaghettiMonsterFlying } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone'

function Upload() {
    const [Title,TitleState] = useState("");
    const [Price,PriceState] = useState(0);
    const [Images,ImageState] = useState([]);
    const [Option,OptionState] = useState("");

    const productTitleHandler = (e) => {
        TitleState(e.currentTarget.value);
    }
    const productPriceHandler = (e) => {
        PriceState(e.currentTarget.value);
    }
    const productOptionHandler = (e) => {
        OptionState(e.currentTarget.value);
    }

    return (
        <div className='productFormContainer'>
            <form className='productForm'>
                <label className='productLabel'>상품이미지</label>
                <br></br>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section className='imagefileForm'>
                        <div  {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
                <br></br>
                <label className='productLabel'>상품명</label>
                <br></br>
                <input type="text" className='productInput'onChange={productTitleHandler} value={Title}/>
                <br></br>
                <label className='productLabel' >가격</label>
                <br></br>
                <input type="text" className='productInput' onChange={productPriceHandler} value={Price}/>
                <br></br>
                <label className='productLabel'>옵션</label>
                <br></br>
                <input type="text" className='productInput' onChange={productOptionHandler} value={Option}/>
                <br></br><button className='productSubmit'>등록</button>
            </form>
        </div>
    )
}

export default Upload;