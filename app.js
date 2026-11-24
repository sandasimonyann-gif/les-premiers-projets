const variants = [
  {
    id: "solo",
    label: "Solo",
    price: 0,
    badge: "Gratuit pour toujours",
  },
  {
    id: "studio",
    label: "Studio",
    price: 12,
    badge: "Le plus populaire",
  },
  {
    id: "collectif",
    label: "Collectif",
    price: 24,
    badge: "Pour les équipes ambitieuses",
  },
];

const previewButton = document.querySelector("#preview-toggle");
const previewMessage = document.querySelector("#preview-message");
const offerSummary = document.querySelector("#offer-summary");
const summaryPrice = document.querySelector("#summary-price");
const trialForm = document.querySelector("#trial-form");
const emailInput = document.querySelector("#lead-email");
const formFeedback = document.querySelector("#form-feedback");

let isPreviewOpen = false;

// Retourne l’offre correspondante ou null si l’identifiant est inconnu.
function findVariant(selectedId) {
  for (const variant of variants) {
    if (variant.id === selectedId) {
      return variant;
    }
  }

  return null;
}

// Met à jour le récapitulatif sans interpréter de contenu HTML.
function updateSummary(selectedId) {
  if (!offerSummary || !summaryPrice) {
    return null;
  }

  const selectedVariant = findVariant(selectedId);

  if (!selectedVariant) {
    offerSummary.textContent = "Cette offre n’est pas disponible.";
    summaryPrice.textContent = "—";
    return null;
  }

  offerSummary.textContent =
    selectedVariant.price === 0
      ? `L’offre ${selectedVariant.label} — gratuite pour toujours.`
      : `L’offre ${selectedVariant.label} — ${selectedVariant.badge.toLowerCase()}.`;
  summaryPrice.textContent =
    selectedVariant.price === 0 ? "0 €" : `${selectedVariant.price} €`;

  return selectedVariant;
}

// Valide l’adresse et met à jour le retour du formulaire.
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function renderFeedbackMessage(message, isError = false) {
  if (!formFeedback) {
    return;
  }

  formFeedback.textContent = message;
  formFeedback.classList.toggle("is-error", isError);
  formFeedback.classList.toggle("is-success", !isError && message.length > 0);
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!emailInput) {
    return;
  }

  const email = emailInput.value.trim();

  if (!email) {
    renderFeedbackMessage("Saisissez votre adresse e-mail pour continuer.", true);
    emailInput.focus();
    return;
  }

  if (!isValidEmail(email)) {
    renderFeedbackMessage("Vérifiez le format de votre adresse e-mail.", true);
    emailInput.focus();
    return;
  }

  renderFeedbackMessage(
    `Merci ! Votre adresse ${email} est prête pour votre essai.`,
  );
}

// Le bouton de démonstration contrôle uniquement son message d’aperçu.
if (previewButton && previewMessage) {
  previewButton.addEventListener("click", () => {
    isPreviewOpen = !isPreviewOpen;
    previewMessage.hidden = !isPreviewOpen;
    previewButton.setAttribute("aria-expanded", String(isPreviewOpen));
    previewButton.lastChild.textContent = isPreviewOpen
      ? " Fermer l’aperçu"
      : " Découvrir Nébula";
    previewButton.querySelector(".play-icon").textContent = isPreviewOpen
      ? "×"
      : "▶";
  });
}

if (trialForm) {
  trialForm.addEventListener("submit", handleFormSubmit);
}

// jQuery gère les contrôles d’interface secondaires et les cartes d’offre.
$(function () {
  const $offerOptions = $(".offer-options");
  const $selectionFeedback = $("#selection-feedback");
  const $detailsToggle = $("#details-toggle");
  const $offerDetails = $("#offer-details");
  const $email = $("#lead-email");
  const $emailCount = $("#email-count");
  const $variantSelect = $("#lead-variant");
  const $helpToggle = $("#help-toggle");
  const $helpMessage = $("#help-message");

  $offerOptions.on("click", "[data-variant-id]", function () {
    const $selectedOption = $(this);
    const selectedId = $selectedOption.attr("data-variant-id");
    const selectedVariant = findVariant(selectedId);

    if (!selectedVariant) {
      return;
    }

    $offerOptions.find("[data-variant-id]").removeClass("is-selected")
      .attr("aria-pressed", "false");
    $selectedOption.addClass("is-selected").attr("aria-pressed", "true");
    $variantSelect.val(selectedVariant.id);
    updateSummary(selectedVariant.id);
    $selectionFeedback.text(`Offre ${selectedVariant.label} sélectionnée.`);
  });

  $detailsToggle.on("click", function () {
    const isExpanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!isExpanded));
    $(this).find("span").text(isExpanded ? "↓" : "↑");
    $offerDetails.stop(true, true);

    if (isExpanded) {
      $offerDetails.slideUp(220, function () {
        $offerDetails.prop("hidden", true);
      });
    } else {
      $offerDetails.prop("hidden", false).slideDown(220);
    }
  });

  $variantSelect.on("change", function () {
    const selectedVariant = findVariant(this.value);

    if (!selectedVariant) {
      return;
    }

    $offerOptions.find("[data-variant-id]").removeClass("is-selected")
      .attr("aria-pressed", "false");
    $offerOptions.find(`[data-variant-id="${selectedVariant.id}"]`)
      .addClass("is-selected")
      .attr("aria-pressed", "true");
    updateSummary(selectedVariant.id);
    $selectionFeedback.text(`Offre ${selectedVariant.label} sélectionnée.`);
  });

  $email.on("focus", function () {
    $(this).addClass("is-focused");
  }).on("blur", function () {
    $(this).removeClass("is-focused");
  }).on("input", function () {
    $emailCount.text(`${this.value.length} / 254`);
  });

  $helpToggle.on("click", function () {
    const isExpanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!isExpanded));
    $helpMessage.stop(true, true);

    if (isExpanded) {
      $helpMessage.fadeOut(180, function () {
        $helpMessage.prop("hidden", true);
      });
    } else {
      $helpMessage.prop("hidden", false).fadeIn(180);
    }
  });
});
