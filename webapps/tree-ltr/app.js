// Generated by CoffeeScript 1.9.3
var getDecendants, ref;

getDecendants = function(ref, dict) {
  var child, children, decendants, i, len;
  if (!((ref != null) && (dict != null))) {
    throw new Error;
  }
  children = dict[ref];
  if (children != null) {
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      if (child.Hash == null) {
        throw new Error;
      }
      decendants = getDecendants(child.Hash, dict);
      if (decendants != null) {
        child.children = decendants;
      }
    }
    return children;
  }
};

ref = 'QmZq1TFx4RF1LbNb9RmEMZxaXpB9UjcFTLRCT4GHzy3Kk2';

d3.xhr("/api/v0/refs?arg=" + ref + "&recursive&format=%3Csrc%3E%20%3Cdst%3E%20%3Clinkname%3E", function(error, xhr) {
  var children, data, dict, dst, linkname, match, refApiPattern, src, whole;
  data = xhr.responseText;
  dict = {};
  refApiPattern = /"Ref": "(\S+) (\S+) (\S+)\\n"/g;
  while (match = refApiPattern.exec(data)) {
    whole = match[0], src = match[1], dst = match[2], linkname = match[3];
    if (dict[src] == null) {
      dict[src] = [];
    }
    dict[src].push({
      Hash: dst,
      Name: linkname
    });
  }
  children = getDecendants(ref, dict);
  this.root = {
    children: children
  };
  console.log(JSON.stringify(this.root, null, 2));
  this.root.x0 = h / 2;
  this.root.y0 = 0;
  return update(this.root);
});
