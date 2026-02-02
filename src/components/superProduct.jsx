import ProductCard from "./productCard";

export default function SuperProduct(){
    return(
        <div>
            <h1>feature product this week</h1>
            <ProductCard
            name="super computer"
            price="$2000"
            image="https://picsum.photos/id/237/200/300"/>
        </div>
    )
}