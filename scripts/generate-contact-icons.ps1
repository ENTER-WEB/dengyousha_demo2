param(
  [string]$OutDir = "images"
)

Add-Type -AssemblyName System.Drawing

function New-Canvas {
  $bmp = New-Object System.Drawing.Bitmap 1254, 1254
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::FromArgb(250, 251, 250))
  return @($bmp, $g)
}

function Save-Canvas {
  param($Bitmap, $Graphics, [string]$Path)
  $Graphics.Dispose()
  $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $Bitmap.Dispose()
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$green = [System.Drawing.Color]::FromArgb(0, 107, 63)
$pen = New-Object System.Drawing.Pen $green, 56
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

# Phone icon
$canvas = New-Canvas
$bmp = $canvas[0]
$g = $canvas[1]
$phonePen = New-Object System.Drawing.Pen $green, 88
$phonePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$phonePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$phonePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddBezier(452, 286, 325, 392, 318, 620, 435, 790)
$path.AddBezier(435, 790, 555, 965, 765, 1018, 952, 916)
$g.DrawPath($phonePen, $path)
$capPen = New-Object System.Drawing.Pen $green, 104
$capPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$capPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$capPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$g.DrawLine($capPen, 432, 286, 548, 278)
$g.DrawLine($capPen, 824, 872, 958, 916)
Save-Canvas $bmp $g (Join-Path $OutDir "contact-phone.png")

# Mail icon
$canvas = New-Canvas
$bmp = $canvas[0]
$g = $canvas[1]
$rect = New-Object System.Drawing.Rectangle 300, 388, 654, 470
$g.DrawRectangle($pen, $rect)
$g.DrawLine($pen, 322, 414, 612, 688)
$g.DrawLine($pen, 932, 414, 642, 688)
$g.DrawLine($pen, 322, 834, 516, 638)
$g.DrawLine($pen, 932, 834, 738, 638)
Save-Canvas $bmp $g (Join-Path $OutDir "contact-mail.png")

# Download icon
$canvas = New-Canvas
$bmp = $canvas[0]
$g = $canvas[1]
$docPen = New-Object System.Drawing.Pen $green, 58
$docPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$docPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$docPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$g.DrawRectangle($docPen, 395, 280, 468, 730)
$g.DrawLine($docPen, 718, 280, 863, 425)
$g.DrawLine($docPen, 718, 280, 718, 425)
$g.DrawLine($docPen, 718, 425, 863, 425)
$g.DrawLine($pen, 626, 514, 626, 775)
$g.DrawLine($pen, 535, 684, 626, 775)
$g.DrawLine($pen, 717, 684, 626, 775)
$g.DrawLine($pen, 510, 838, 742, 838)
Save-Canvas $bmp $g (Join-Path $OutDir "contact-download.png")
