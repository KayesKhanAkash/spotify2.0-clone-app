import { useParams } from "react-router-dom";
import LoadingCategory from "../Loading/LoadingCategory";
import { useDispatch, useSelector } from "react-redux";
import { getAverageHex } from "../Helper/Functions";
import { getHexColorCode } from "../../Redux/Slice/PlayerSlice";
import MusicCart from "../Pages/Home/MusicCart";
import { styles } from "../../Utils/commonStyles";

const Category = () => {
  const { categoryId } = useParams();
  const { categories, categoryPlaylists } = useSelector(
    (state) => state.DataLayerSlice
  );
  const { hexColorCode } = useSelector((state) => state.PlayerSlice);
  const dispatch = useDispatch();

  const singlePlaylists = categoryPlaylists?.find((item) =>
    item?.playlists?.href?.includes(categoryId)
  );

  const singleCategory = categories?.categories?.items?.find((item) =>
    item?.href?.includes(categoryId)
  );

  const handleHex = (e) => {
    dispatch(getHexColorCode(getAverageHex(e.target)));
  };

  return singlePlaylists ? (
    <div className="category">
      <div
        className={`category-header w-full h-[60vh] max-h-[400px] flex items-end ${styles.paddingX}`}
        style={{
          background: `linear-gradient(170deg, ${hexColorCode}, transparent)`,
        }}
      >
        <h1 className="text-5xl mb-6">{singleCategory?.name}</h1>
        <img
          src={singlePlaylists?.playlists?.items[0]?.images[0]?.url}
          alt="img"
          onLoad={handleHex}
          className="hidden"
          crossOrigin=""
        />
      </div>

      <div className={`${styles.gridContainer} ${styles.paddingX} mt-12`}>
        {singlePlaylists?.playlists?.items?.map((item) => (
          <div key={item?.id}>
            <MusicCart
              img={item?.images[0]?.url}
              title={item?.name}
              description={item?.description}
              playlistId={item?.id}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <LoadingCategory />
  );
};

export default Category;
