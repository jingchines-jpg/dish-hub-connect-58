import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import QRCode from "qrcode";
import { Download, Share, Copy, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeGenerator({ open, onOpenChange }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState("Restaurante Demo");
  const [customMessage, setCustomMessage] = useState("Escaneie para ver nosso cardápio digital");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const menuUrl = `${window.location.origin}/cardapio`;

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(menuUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#142D1B', // Primary color from our design system
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o QR Code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (open) {
      generateQRCode();
    }
  }, [open]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(menuUrl);
    toast({
      title: "Copiado!",
      description: "Link do cardápio copiado para a área de transferência",
    });
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    // Create a canvas to combine QR code with text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size
      canvas.width = 400;
      canvas.height = 500;

      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw restaurant name
      ctx.fillStyle = '#142D1B';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(restaurantName, canvas.width / 2, 40);

      // Draw QR code
      const qrSize = 300;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = 60;
      ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

      // Draw custom message
      ctx.font = '16px Arial';
      ctx.fillStyle = '#666666';
      const words = customMessage.split(' ');
      let line = '';
      let y = 400;
      const lineHeight = 20;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > 350 && n > 0) {
          ctx.fillText(line, canvas.width / 2, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);

      // Download
      const link = document.createElement('a');
      link.download = `qr-code-${restaurantName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = qrCodeUrl;
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cardápio - ${restaurantName}`,
          text: customMessage,
          url: menuUrl,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5" />
            <span>Gerar QR Code do Cardápio</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
              <Input
                id="restaurant-name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-message">Mensagem Personalizada</Label>
              <Textarea
                id="custom-message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* QR Code Display */}
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              {isGenerating ? (
                <div className="w-[300px] h-[300px] flex items-center justify-center bg-muted rounded-lg mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : qrCodeUrl ? (
                <div className="space-y-4">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code do Cardápio"
                    className="mx-auto rounded-lg shadow-sm"
                  />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">{restaurantName}</p>
                    <p className="text-xs">{menuUrl}</p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={copyToClipboard}
              className="flex flex-col items-center space-y-1 h-auto py-3"
            >
              <Copy className="w-4 h-4" />
              <span className="text-xs">Copiar Link</span>
            </Button>
            <Button
              variant="outline"
              onClick={downloadQRCode}
              disabled={!qrCodeUrl}
              className="flex flex-col items-center space-y-1 h-auto py-3"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs">Download</span>
            </Button>
            <Button
              variant="outline"
              onClick={shareQRCode}
              className="flex flex-col items-center space-y-1 h-auto py-3"
            >
              <Share className="w-4 h-4" />
              <span className="text-xs">Compartilhar</span>
            </Button>
          </div>

          <Button
            variant="hero"
            onClick={generateQRCode}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Gerando..." : "Regenerar QR Code"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}