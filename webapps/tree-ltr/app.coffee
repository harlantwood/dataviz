# A request to:
#
# http://localhost:5001/api/v0/object/get?arg=/ipfs/QmPE6xb88LKNkwptiAsKNQ2Tryd8S8r9CBs1t9fSdXh9cY
#
# Returns JSON like:
#
# "Links": [
#   {
#     "Name": "viz.html",
#     "Hash": "QmfY5W7vwrD9FycZNg3zikZSpcRwPDwDJp21b3NqMM8dw5",
#     "Size": 4743
#   }
# ],
# "Data": "\u0008\u0001"
#

d3.json 'http://localhost:5001/api/v0/object/get?arg=/ipfs/QmPE6xb88LKNkwptiAsKNQ2Tryd8S8r9CBs1t9fSdXh9cY', (ipfsData) ->

  @root = Name: "links", children: ipfsData.Links
  @root.x0 = h / 2
  @root.y0 = 0

  toggleAll = (d) ->
    if d.children
      d.children.forEach toggleAll
      toggle d

  @root.children.forEach toggleAll
  update @root
