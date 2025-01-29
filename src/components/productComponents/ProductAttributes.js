import React, { useEffect, useMemo, useRef, useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import AttributeOptions from "./AttributeOptions";

export default function ProductAttributes({
  defaultSelected,
  attributes,
  updated,
  variations,
}) {
  // store the selected options (name and value) of each attribute
  const [selected, setSelected] = useState([]);
  const [newSelectOption, setNewSelectedOption] = useState(false);
  const [filteredAttrs, setFilteredAttrs] = useState([]);

  // update selected array if an option is selected ,
  // and test if it exists, if it does we update its option to avoid pushing another option of same attribute

  const updateSelected = (attr) => {
    if (attr?.remove) {
      setSelected((curr) =>
        curr.filter(localAttr => attr.id !== localAttr.id)
      );
      return;
    }
    let indexOfOption = -1;

    // if no option is selected yet, add the new selected one directly
    if (selected.length === 0) {
      setSelected([attr]);
    } else {
      // if there are already selected options check if the newly selected already exists in the selected array
      indexOfOption = selected.findIndex((item) => item.name === attr.name);

      // if it doesnt exist, add it
      if (indexOfOption === -1) {
        setSelected((curr) => [...curr, attr]);
      } else {
        // if it exists in the array, find it and replace its value
        let tempSelected = [];

        setSelected((curr) =>
          curr.map((item) => {
            if (item.id === attr.id && item.option !== attr.option) {
              return attr;
            }
            return item;
          })
        );
       
      }
    }

    setNewSelectedOption(attr);
  };

  useEffect(() => {
    if (selected.length > 0) {
      // loop attributes and leave only available combination with selected option
      // const filteredVariations = variations.filter((variation) =>
      //   variation.attributes.every(varAttr => 
      //     (attribute) =>
      //       attribute.id === newSelectOption.id &&
      //       attribute.option === newSelectOption.option
      //   )
      // );

      const filteredVariations = variations.filter((variation) => {
        return selected.every((selectedAttr) => {
          return variation.attributes.some(
            (variationAttr) =>
              variationAttr.id === selectedAttr.id &&
              variationAttr.option === selectedAttr.option
          );
        });
      });

      // filter next unselected attribute options
      try {
        const nextAttr = attributes.find(
          (attr) => attr.position === newSelectOption.position + 1
        );

        const filiterOptions = filteredVariations.map((filteredVar) => {
          const filteredAttr = filteredVar.attributes.find(
            (filiterAttr) => filiterAttr.id === nextAttr.id
          );
          return filteredAttr.option;
        });
        const attrs = {
          ...nextAttr,
          options: filiterOptions.filter(function (item, pos) {
            return filiterOptions.indexOf(item) == pos;
          }),
        };

        setFilteredAttrs((curr) =>
          curr.map((attr) => {
            if (attr.id === attrs.id) {
              return attrs;
            }
            return attr;
          })
        );
      } catch (error) {
      }

      // attributes.forEach((attribute) => {
      //   if (attribute.position === newSelectOption.position + 1) {
      //     let tempOptions = [];
      //     let attrIndex = attributes.findIndex(
      //       (x) => x.name === attribute.name
      //     );

      //     filteredVariations.forEach((filteredVariation) => {
      //       let tempIndexVArATt = filteredVariation.attributes.findIndex(
      //         (x) => x.name === attribute.name
      //       );

      //       if (tempIndexVArATt !== -1) {
      //         tempOptions.push(
      //           filteredVariation.attributes[tempIndexVArATt].option
      //         );
      //       }
      //     });

      //     tempOptions = [...new Set(tempOptions)];
      //     attributes[attrIndex].options = tempOptions;
      //   }
      // });
    }

    // call update function in Singleproduct page to update the current product displaying

      updated(selected);
    
  }, [selected, newSelectOption]);

  useEffect(() => {
    setFilteredAttrs(attributes);
  }, [attributes]);

  useEffect(()=>{
  },[filteredAttrs])

  return (
    <ErrorBoundary>
      <div className="py-3">
      <hr className="pt-6"/>
      <span className="text-gray-600 text-lg font-medium">Choix des options:</span>
      <span className="text-rachel-red-900 text-md font-semibold block">Merci de choisir une variation</span>
        {filteredAttrs?.map((attribute, index, array) => {
          // const FirstActive = defaultSelected.find(
          //   (attr) => attr.id === attribute.id
          // );

          return (
            <div
              className="flex w-full border-b first:border-t py-5"
              key={attribute.id}
            >
              <p className="w-1/3">{attribute?.name}</p>
              
              {attribute?.options?.length > 0 && (
                <AttributeOptions
                  id={attribute.id}
                  name={attribute?.name}
                  updateSelected={updateSelected}
                  options={attribute?.options}
                  selected={selected}
                  attributes={attributes}
                  index={index}
                  position={attribute.position}
                  newSelectOption={newSelectOption}
                />
              )}
            </div>
          );
        })}
      </div>
    </ErrorBoundary>
  );
}
