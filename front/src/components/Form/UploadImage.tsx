import { useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PrimaryButton } from "../Buttons/PrimaryButton";

type UploadImageProps = {
  name: string;
  uploadUrl: string;
};

export const UploadImage = ({ name, uploadUrl }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setValue, watch } = useFormContext();

  const previewUrl = watch(name);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setValue(name, data.url);
      } else {
        console.error("Erro no upload:", data.error);
      }
    } catch (err) {
      console.error("Erro na requisição de upload:", err);
    }
  };

  console.log(previewUrl)

  return (
    <Box>
      <PrimaryButton
        w="100%"
        onClick={() => inputRef.current?.click()}
      >
        <Text>{previewUrl ? "Trocar imagem" : "Selecionar imagem"}</Text>
      </PrimaryButton>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {previewUrl && (
        <Box mt={3} borderRadius="md" overflow="hidden">
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Box>
      )}
    </Box>
  );
};