import * as React from 'react';
import styled from 'styled-components';

interface Props {
  type: string;
}

enum ColorType {
  normal = "rgb(156, 156, 99)",
  fighting = "rgb(174, 42, 36)",
  flying = "rgb(142, 111, 235)",
  poison = "rgb(146, 58, 146)",
  ground = "rgb(219, 181, 77)",
  rock = "rgb(164, 143, 50)",
  bug = "rgb(151, 165, 29)",
  ghost = "rgb(100, 78, 136)",
  steel = "rgb(160, 160, 192)",
  fire = "rgb(237, 109, 18)",
  water = "rgb(69, 120, 237)",
  grass = "rgb(105, 194, 61)",
  electric = "rgb(246, 201, 19)",
  psychic = "rgb(247, 54, 112)",
  ice = "rgb(126, 206, 206)",
  dragon = "rgb(94, 29, 247)",
  dark = "rgb(100, 78, 64)",
  fairy = "rgb(232, 120, 144)"
}

const Container = styled.span`
  margin-right: 5px;
  padding: 5px;
  color: white;
  font-weight: bold;
  background: ${({ color }: { color: string }) => color};
  text-align: center;
`;

export default function PokeType(props: Props) {
  return (
    <Container color={ColorType[props.type]}>{props.type.toLocaleUpperCase()}</Container>
  );
};