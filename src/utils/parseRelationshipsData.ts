function parseRelationshipsData(relationshipsDataXml: string): {
  [key: string]: string;
} {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    relationshipsDataXml,
    "application/xml",
  );
  const relationships = xmlDoc.getElementsByTagName("Relationship");
  const relationshipMap: { [key: string]: string } = {};

  for (let i = 0; i < relationships.length; i++) {
    const relationship = relationships[i];
    const id = relationship.getAttribute("Id");
    const target = relationship.getAttribute("Target");

    if (id && target) {
      relationshipMap[id] = target;
    }
  }

  return relationshipMap;
}

export default parseRelationshipsData;
