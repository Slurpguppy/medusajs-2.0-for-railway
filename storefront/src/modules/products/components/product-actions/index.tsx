"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRepeat, faTruck } from "@fortawesome/free-solid-svg-icons"

const handleDeliveryDaySelect = (day: string) => {
  const deliveryDayElement = document.getElementById('delivery-day');
  if (deliveryDayElement) {
    deliveryDayElement.textContent = `Selected day: ${day}`;
  }
};

const handleDeliveryFrequencySelect = (frequency: string) => {
  const deliveryFrequencyElement = document.getElementById('delivery-frequency');
  if (deliveryFrequencyElement) {
    deliveryFrequencyElement.textContent = `Selected frequency: ${frequency}`;
  }
};

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce((acc: Record<string, string | undefined>, varopt: any) => {
    if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  return (
    <>
    <style jsx>{`
    .dropdown {
        position: relative;
        display: inline-block;
        margin-bottom: 20px;
    }

    .dropbtn {
        background-color: #3498db;
        color: white;
        padding: 10px 15px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        width: 100%;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 150px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        z-index: 1;
    }

    .dropdown-content a {
        color: black;
        padding: 10px;
        display: block;
        text-decoration: none;
    }

    .dropdown-content a:hover {
        background-color: #f1f1f1;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown:hover .dropbtn {
        background-color: #2980b9;
    }

    .selected-option {
        margin-top: 10px;
        padding: 10px;
        background-color: #f1f1f1;
        border-radius: 5px;
        color: #333;
        font-size: 14px;
    }
`}</style>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.title ?? ""]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>
        <span style={{ display: "block" }}></span>

        <div className="dropdown">
    <button className="dropbtn">
        <FontAwesomeIcon icon={faTruck} style={{ color: "#fff", marginRight: "8px" }} />
        Deliver On:
    </button>
    <div className="dropdown-content">
        <a href="#" onClick={() => handleDeliveryDaySelect("Monday")}>
            <FontAwesomeIcon icon={faTruck} style={{ color: "#black", marginRight: "8px" }} />
            Monday
        </a>
        <a href="#" onClick={() => handleDeliveryDaySelect("Tuesday")}>
            <FontAwesomeIcon icon={faTruck} style={{ color: "#black", marginRight: "8px" }} />
            Tuesday
        </a>
        <a href="#" onClick={() => handleDeliveryDaySelect("Wednesday")}>
            <FontAwesomeIcon icon={faTruck} style={{ color: "#black", marginRight: "8px" }} />
            Wednesday
        </a>
        <a href="#" onClick={() => handleDeliveryDaySelect("Thursday")}>
            <FontAwesomeIcon icon={faTruck} style={{ color: "#black", marginRight: "8px" }} />
            Thursday
        </a>
        <a href="#" onClick={() => handleDeliveryDaySelect("Friday")}>
            <FontAwesomeIcon icon={faTruck} style={{ color: "#black", marginRight: "8px" }} />
            Friday
        </a>
    </div>
    <div className="selected-option" id="delivery-day">
        Selected day: None
    </div>
</div>

<div className="dropdown">
    <button className="dropbtn">
        <FontAwesomeIcon icon={faRepeat} style={{ color: "#fff", marginRight: "8px" }} />
        Delivery frequency:
    </button>
    <div className="dropdown-content">
        <a href="#" onClick={() => handleDeliveryFrequencySelect("This Week")}>
            <FontAwesomeIcon icon={faRepeat} style={{ color: "#black", marginRight: "8px" }} />
            This Week
        </a>
        <a href="#" onClick={() => handleDeliveryFrequencySelect("Next Week")}>
            <FontAwesomeIcon icon={faRepeat} style={{ color: "#black", marginRight: "8px" }} />
            Next Week
        </a>
        <a href="#" onClick={() => handleDeliveryFrequencySelect("Every Week")}>
            <FontAwesomeIcon icon={faRepeat} style={{ color: "#black", marginRight: "8px" }} />
            Every Week
        </a>
        <a href="#" onClick={() => handleDeliveryFrequencySelect("Every other Week")}>
            <FontAwesomeIcon icon={faRepeat} style={{ color: "#black", marginRight: "8px" }} />
            Every other Week
        </a>
        <a href="#" onClick={() => handleDeliveryFrequencySelect("Every 3 Weeks")}>
            <FontAwesomeIcon icon={faRepeat} style={{ color: "#black", marginRight: "8px" }} />
            Every 3 Weeks
        </a>
        <a href="#" onClick={() => handleDeliveryFrequencySelect("Once per month")}>
            <FontAwesomeIcon icon={faRepeat} style={{ color: "#black", marginRight: "8px" }} />
            Once per month
        </a>
    </div>
    <div className="selected-option" id="delivery-frequency">
        Selected frequency: None
    </div>
</div>

    <span style={{ display: "block" }}></span>
    <span style={{ display: "block" }}></span>
    <span style={{ display: "block" }}></span>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding}
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : "Add to order"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
      <p style={{ fontWeight: "light", fontSize: "15px" }}>Click 'Add to order' to add the item to your order. No need to finalize; items will be delivered unless removed. Enjoy!</p>
    </>
  )
}
