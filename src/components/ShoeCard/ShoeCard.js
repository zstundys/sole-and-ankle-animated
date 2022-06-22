import styled from "styled-components/macro";

import { QUERIES, WEIGHTS } from "../../constants";
import { formatPrice, isNewShoe, pluralize } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const hoverHue = {
    "--hover-hue": `${parseInt(Math.random() * 360)}deg`,
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <ImageScaler style={hoverHue}>
            <Image alt="" src={imageSrc} />
          </ImageScaler>

          {variant === "on-sale" && <SaleFlag style={hoverHue}>Sale</SaleFlag>}
          {variant === "new-release" && (
            <NewFlag style={hoverHue}>Just released!</NewFlag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color":
                variant === "on-sale" ? "var(--color-gray-700)" : undefined,
              "--text-decoration":
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

const ImageWrapper = styled.div`
  position: relative;

  @media ${QUERIES.prefersMotion} {
    ${Flag} {
      transition: background-color 300ms, border-radius 300ms;
    }

    &:hover ${Flag} {
      background: hsl(var(--hover-hue) 100% 50%);
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const ImageScaler = styled.div`
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;

  @media ${QUERIES.prefersMotion} {
    --hover-hue: 0deg;

    transition: box-shadow 500ms;

    ${Image} {
      transform-origin: 50% 85%; // Focus on the shoe
      transition: transform 500ms, filter 500ms;
      will-change: transform;
    }

    &:hover {
      box-shadow: 0 0 0 5px hsl(var(--hover-hue) 100% 50%),
        0 4px 24px -5px hsl(var(--hover-hue) 100% 50%);

      ${Image} {
        transform: scale(1.1);
        transition-duration: 200ms;
        filter: brightness(1.05);
      }
    }
  } ;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

export default ShoeCard;
