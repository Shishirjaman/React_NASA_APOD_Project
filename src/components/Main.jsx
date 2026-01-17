export default function Main(props){

    const { data } = props

    return(
        <div className="imgContainer">
            <img src={data.hdurl} alt={data.tittle || 'bg-img'} srcset="" className="bgImage" />
        </div>
    )
}