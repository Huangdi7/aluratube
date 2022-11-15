import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient} from "@supabase/supabase-js";

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://izgfllmjzglhdcpwuozl.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6Z2ZsbG1qemdsaGRjcHd1b3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTk0MjYsImV4cCI6MTk4NDAzNTQyNn0.kgoWP0u4d8Yz_FIOyRW8tUUxSNBCMfwvpcR04Ad2EQs"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "teste", url: "https://www.youtube.com/watch?v=lY2Y23lHEtk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false)

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel 
            ? ( 
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log(formCadastro.values);
                supabase.from("video").insert({
                    title: formCadastro.values.titulo,
                    url: formCadastro.values.url,
                    thumb: getThumbnail(formCadastro.values.url),
                    playlist: "jogos"
                })
                .then((oqueveio) => {
                    console.log(oqueveio)
                })
                .catch((err) => {
                    console.log(err)
                })
                setFormVisivel(false);
                formCadastro.clearForm();

            }}>
                <div>
                    <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                        X
                    </button>
                    <input 
                        placeholder="Titulo do video"
                        name="titulo"
                        value={formCadastro.values.titulo}
                        onChange={formCadastro.handleChange}
                    />

                    <input 
                        placeholder="URL" 
                        name="url" 
                        value={formCadastro.values.url} 
                        onChange={formCadastro.handleChange}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
                
            </form>
            )
            : null    
        }
            
        </StyledRegisterVideo>
    )
}