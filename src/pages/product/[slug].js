// Name of file inside of square brackets '[slug].js' means that comp is dynamic route
import { client } from '../../lib/client';
import ProdContainer from '../../components/Slug/ProdContainer/ProdContainer';
import ProdImgs from '../../components/Slug/ProdImgs/ProdImgs';
import ProdDescr from '../../components/Slug/ProdDescr/ProdDescr';
import SimilarProducts from '../../components/Slug/SimilarProducts/SimilarProducts';

const ProductDetails = ({ product, similarProducts }) => {
  return (
    <>
      <ProdContainer>
        <ProdImgs product={product} />
        <ProdDescr product={product} />
      </ProdContainer>
      <SimilarProducts similarProducts={similarProducts} />
    </>
  );
};

// If a page has Dynamic Routes and uses getStaticProps() -> needs to define a list of paths to be statically generated.
// getStaticPaths() exported from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths()
export const getStaticPaths = async () => {
  const query = `*[_type in ["laptops", "headphones", "headphones-tws", "other"]] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map(product => ({
    params: { slug: product.slug.current }
  }));
  
  return {
    paths: [],
    fallback: 'blocking'
  }
};

// Pre-render page at BUILD time using returned props 
// getStaticProps() - tells Next comp to populate props and render into a static HTML page at BUILD time.
// Fetch prod details && similar prods
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type in ["laptops", "headphones", "headphones-tws", "other"] && slug.current == '${slug}']`;
  const [ product ] = await client.fetch(query);

  const similarQuery = `*[_type == "${product._type}" && slug.current != '${slug}']`;
  const similarProducts = await client.fetch(similarQuery);

  return {
    props: { product, similarProducts }
  }
};

export default ProductDetails;
