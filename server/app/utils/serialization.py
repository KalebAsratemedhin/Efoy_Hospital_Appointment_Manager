from typing import Any
from beanie.odm.fields import Link
from pydantic import BaseModel

def serialize_mongo_doc(doc: Any) -> dict:
    if doc is None:
        return None
    d = doc.dict() if hasattr(doc, "dict") else dict(doc)
    if "id" in d:
        d["id"] = str(d["id"])
    if "_id" in d:
        d["id"] = str(d["_id"])
        del d["_id"]

    for key, value in d.items():
        if isinstance(value, Link):
            # Handle Link objects - extract the ID from the reference
            if hasattr(value, 'ref') and hasattr(value.ref, 'id'):
                d[key] = str(value.ref.id)
            else:
                # If the Link is not resolved, we might need to handle it differently
                d[key] = str(value) if value else None
        elif isinstance(value, BaseModel) and hasattr(value, 'id') and value.id:
             d[key] = str(value.id)
        elif isinstance(value, dict) and 'id' in value:
             d[key] = str(value['id'])

    return d


def serialize_mongo_docs(docs: list) -> list:
    return [serialize_mongo_doc(doc) for doc in docs] 