function parseRelationshipsData(relationshipsDataXml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    relationshipsDataXml,
    "application/xml",
  );
  const relationships = xmlDoc.getElementsByTagName("Relationship");
  const relationshipMap = {};

  for (let relationship of relationships) {
    const id = relationship.getAttribute("Id");
    const target = relationship.getAttribute("Target");
    relationshipMap[id] = target;
  }

  return relationshipMap;
}

export default parseRelationshipsData;
