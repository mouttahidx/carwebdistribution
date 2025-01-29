import React from "react";

export default function ProductDescription({ description, additionalInfos }) {
  return (
    <div className="px-3 py-6 md:p-4 bg-white rounded-md border">
      <div className="pb-10 border-b">
        <h3 className="mb-10 font-semibold text-lg">Description</h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="pt-10">
        <h3 className="mb-10 font-semibold text-lg">
          Informations Complémentaires
        </h3>
        {additionalInfos?.length > 0 &&
          additionalInfos.map(({ id, name, options }) => (
            <div key={id}>
              <p>
                <span className="font-bold">{name}</span> :{" "}
                {options.map((opt, i) => (
                  <span key={i} className="text-smmr-2">
                    {opt},
                  </span>
                ))}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
