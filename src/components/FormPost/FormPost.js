import { useState } from "react"
import { useSession } from "../../middlewares/LineaProtetta";



const FormPost = () => {
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({})
    console.log(formData)

    const onChangeFile = (e) => {
        setFile(e.target.files[0]) //sempre posizione dei file, non cambia
    }

    const session = useSession()
    console.log( session.id);

    const uploadFile = async (imgcover) => {
        const fileData = new FormData()
        fileData.append('imgcover', imgcover)

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/posts/cloudUpload`, {
                method: "POST",
                body: fileData
            })
            return await response.json()
        } catch (error) {
            console.log(error);
        }
    }

    

    const onSubmit = async (e) => {
        e.preventDefault()
        
        if(file) {
            try {
                const uploadCover = await uploadFile(file)
                const finalBody = {
                    ...formData, 
                    imgcover: uploadCover.imgcover,
                    author: session.id
                }

                const response = await fetch(`${process.env.REACT_APP_URL}/posts/create`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(finalBody)
                })
                window.location.reload()
                return response.json()
            } catch (error) {
                console.log(error);
            }
        } else {
            console.error("Inserisci un'immagine");
        }
    }
    return (
        <div className="my-5">
            <form 
                encType="multipart/form-data" //si chiama cosi perche contiene piu dati 
                onSubmit={onSubmit}
                className="flex flex-col justify-center items-center gap-4">
                <input
                    className="w-[400px] p-1 rounded border-2"
                    placeholder="Titolo Post"
                    name="title"
                    type="text"
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value
                    })}
                />
                <input
                    className="w-[400px] p-1 rounded border-2"
                    placeholder="Categoria Post"
                    name="category"
                    type="text"
                    onChange={(e) => setFormData({
                        ...formData,
                        category: e.target.value
                    })}
                />
                <input
                    className="w-[400px] p-1 rounded border-2"
                    name="imgcover"
                    type="file"
                    onChange={onChangeFile}
                />
                <input
                    className="w-[400px] p-1 rounded border-2"
                    placeholder="Commenti"
                    name="description"
                    type="text"
                    onChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value
                    })}
                />
                <input
                    className="w-[400px] p-1 rounded border-2"
                    placeholder="Voto"
                    name="rate"
                    type="number"
                    onChange={(e) => setFormData({
                        ...formData,
                        rate: Number(e.target.value)
                    })}
                />
            
                <div className="flex gap-2">
                    <button type="submit" className="p-2 bg-violet-800 hover:bg-violet-800 text-white rounded">
                        CREA NUOVO POST
                    </button>
                </div>
            </form>
        </div>
    )
}
export default FormPost